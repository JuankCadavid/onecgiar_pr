export class CreateEvidenceDto {
  public result_id: number;
  public evidences: evidencesCreateInterface[];
  public supplementary: evidencesCreateInterface[];
}

interface evidencesCreateInterface {
  is_knowledge_product?: boolean;
  link: string;
  description?: string;
  gender_related?: boolean;
  youth_related?: boolean;
  nutrition_related?: boolean;
  environmental_biodiversity_related?: boolean;
  poverty_related?: boolean;
}
