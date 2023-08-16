import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateResultQuestionDto } from './dto/create-result-question.dto';
import { UpdateResultQuestionDto } from './dto/update-result-question.dto';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { ResultQuestionsRepository } from './repository/result-questions.repository';

@Injectable()
export class ResultQuestionsService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _resultQuestionRepository: ResultQuestionsRepository,
  ) {}

  async findQuestionInnovationDevelopment() {
    try {
      const scaling = await this.scaling();

      return {
        response: {
          responsible_innovation_and_scaling: scaling[0],
        },
        message: 'Successful response',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async scaling() {
    try {
      const responsible_innovation_and_scaling =
        await this._resultQuestionRepository.find({
          where: { question_level: 1, result_type_id: 7 },
        });

      const scalingWithOptions = await Promise.all(
        responsible_innovation_and_scaling.map(async (item) => {
          const questions = await this._resultQuestionRepository.find({
            where: {
              question_level: 2,
              parent_question_id: item.result_question_id,
            },
          });

          const questionsWithOptions = await Promise.all(
            questions.map(async (question) => {
              const options = await this._resultQuestionRepository.find({
                where: {
                  question_level: 3,
                  parent_question_id: question.result_question_id,
                },
              });

              const optionsWithSubOptions = await Promise.all(
                options.map(async (option) => {
                  const subOptions = await this._resultQuestionRepository.find({
                    where: {
                      question_level: 4,
                      parent_question_id: option.result_question_id,
                    },
                  });

                  const optionWithSubOptions = { ...option, subOptions };
                  return optionWithSubOptions;
                }),
              );

              const questionWithOptions = {
                ...question,
                options: optionsWithSubOptions,
              };
              return questionWithOptions;
            }),
          );

          const mappedItem = { ...item, q1: questionsWithOptions[0], q2: questionsWithOptions[1] };
          return mappedItem;
        }),
      );

      return scalingWithOptions;
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }
}
