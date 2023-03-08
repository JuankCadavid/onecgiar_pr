import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TocLevel } from '../../toc-level/entities/toc-level.entity';
import { ClarisaInitiative } from '../../../clarisa/clarisa-initiatives/entities/clarisa-initiative.entity';
import { ResultsPackageTocResult } from '../../../api/ipsr/results-package-toc-result/entities/results-package-toc-result.entity';
import { ShareResultInnovationPackageRequest } from '../../../api/ipsr/share-result-innovation-package-request/entities/share-result-innovation-package-request.entity';

@Entity('toc_result')
export class TocResult {

    @PrimaryGeneratedColumn({
        name: 'toc_result_id'
    })
    toc_result_id: number;

    @Column({
        name: 'toc_internal_id',
        type: 'text',
        nullable: true
    })
    toc_internal_id!: string;

    @Column({
        name: 'title',
        type: 'text',
        nullable: true
    })
    title: string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: true
    })
    description: string;

    @ManyToOne(() => TocLevel, tl => tl.toc_level_id)
    @JoinColumn({
        name: 'toc_level_id'
    })
    toc_level_id: string;

    @Column({
        name: 'toc_type_id',
        type: 'bigint',
        nullable: true
    })
    toc_type_id!: number;

    @ManyToOne(() => ClarisaInitiative, ci => ci.id)
    @JoinColumn({
        name: 'inititiative_id'
    })
    inititiative_id: number;

    @Column({
        name: 'work_package_id',
        type: 'text',
        nullable: true
    })
    work_package_id!: string;

    @Column({
        name: 'is_active',
        type: 'boolean',
        nullable: false,
        default: true
    })
    is_active: boolean;

    @OneToMany(() => ResultsPackageTocResult, rptr => rptr.obj_toc_result)
    results_package_toc_result: ResultsPackageTocResult[];

    @OneToMany(() => ShareResultInnovationPackageRequest, rptr => rptr.obj_toc_result)
    share_result_innovation_package_request: ShareResultInnovationPackageRequest[];

}
