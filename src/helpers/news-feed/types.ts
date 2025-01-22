export type EhrNewsFeedType = "Immunizations" | "LabReports" | "Procedures" | "Reports";

export interface EhrNewsFeedPageModel {
    NextPageID?: string
    NextPageDate?: string
    Events: EhrNewsFeedEventModel[]
}

export type EhrNewsFeedEvent =
    EhrNewsFeedImmunizationModel |
    EhrNewsFeedReportModel |
    EhrNewsFeedProcedureModel[] |
    EhrNewsFeedLabReportModel | 
    EhrNewsFeedClaimProcedureModel[] |
    EhrNewsFeedClaimServiceModel[];

export type EhrNewsFeedEventType =
    "ProcedureGroup" |
    "Report" |
    "Immunization" |
    "LabReport" |
    "ClaimProcedureGroup" |
    "ClaimServiceGroup"

export interface EhrNewsFeedEventModel {
    Type: EhrNewsFeedEventType
    Category?: string
    ID: string
    Date: string
    Event: EhrNewsFeedEvent
    Patient: EhrNewsFeedPatientModel
}

export interface EhrNewsFeedPatientModel {
    PatientID: string
    PersonID: string
    PatientName: string
    RecordAuthority: string
}

export interface EhrNewsFeedCaregiverModel {
    ID: string
    CaregiverName?: string
    Specialty?: string
    Addresses: EhrNewsFeedCaregiverAddressModel[]
    ContactInfos: EhrNewsFeedCaregiverContactInfoModel[]
    Pcp: boolean
}

export interface EhrNewsFeedCaregiverAddressModel {
    Type?: string
    Street1?: string
    Street2?: string
    Street3?: string
    City?: string
    County?: string
    State?: string
    Zip?: string
    Country?: string
}

export interface EhrNewsFeedCaregiverContactInfoModel {
    Type?: string
    Info?: string
}

export interface EhrNewsFeedTermInformationModel {
    TermName: string
    TermCode: string
    TermNamespace: string
    TermFamily: string
}

export interface EhrNewsFeedLabReportModel {
    ID: string
    ObservationDate: string
    PlacerOrderNumber?: string
    FillerOrderNumber?: string
    AccessionNumber?: string
    EncounterID?: string
    LabObservations: EhrNewsFeedLabObservationModel[]
    ReportStatusDate?: string
    ReportStatus?: string
    Service: string
    Comment?: string
    OrderingCaregiver?: EhrNewsFeedCaregiverModel
    Location?: string
    ServiceDefinition?: string
}

export interface EhrNewsFeedLabObservationModel {
    ID: string
    Type: string
    Value: string
    Units?: string
    Acuity?: string
    NormalRange?: string
    Comment?: string
    AcuityHighlight?: string
    ObservationDate?: string
    ObservationResultStatus?: string
    ObservationResultStatusDate?: string
    TrendAvailable?: boolean
    TypeDefinition?: string
}

export interface EhrNewsFeedProcedureModel {
    ID: string
    Date?: string
    Procedure: string
    Type?: string
    Description?: string
    Location?: string
    PerformedByCaregiver?: EhrNewsFeedCaregiverModel
    VerifiedByCaregiver?: EhrNewsFeedCaregiverModel
}

export interface EhrNewsFeedConditionModel {
    ID: string
    Problem?: string
    Description?: string
    Date?: string
    StopDate?: string
    Type?: string
    Status?: string
    Term?: EhrNewsFeedTermInformationModel
    VerifiedByCaregiver?: EhrNewsFeedCaregiverModel
}

export interface EhrNewsFeedMedicationModel {
    ID: string
    Medication?: string
    PrescribedDate?: string
    Dose?: string
    Status?: string
    Quantity?: string
    Units?: string
    DoseUnits?: string
    RefillNumber?: string
    DaysSupplied?: string
    Comment?: string
    Prescriber?: EhrNewsFeedCaregiverModel
    Pharmacy?: EhrNewsFeedCaregiverModel
    Frequency?: string
    TherapeuticClass?: string
}

export interface EhrNewsFeedPharmacyOrderModel {
    ID: string
    OrderItem?: string
    StartDate?: string
    StopDate?: string
    Indication?: string
    Status?: string
    Route?: string
    Strength?: string
    OrderDate?: string
    OrderText?: string
    OrderingCaregiver?: EhrNewsFeedCaregiverModel
}

export interface EhrNewsFeedReportModel {
    ID: string
    Type: string
    Format?: string
    Summary?: string
    DictatedByCaregiver?: EhrNewsFeedCaregiverModel
    Content?: string
    Location?: string
}

export interface EhrNewsFeedEncounterModel {
    ID: string
    AdmitDate?: string
    DischargeDate?: string
    AdmissionType?: string
    PatientClass?: string
    PrimaryDiagnosis?: string
    PrimaryLocation?: string
    PrimaryCaregiver?: EhrNewsFeedCaregiverRelationshipModel
    OtherCaregivers?: EhrNewsFeedCaregiverRelationshipModel[]
    DisplayMode?: string
}

export interface EhrNewsFeedCaregiverRelationshipModel {
    Caregiver: EhrNewsFeedCaregiverModel
    RelationshipTypes?: string[]
}

export interface EhrNewsFeedClaimModel {
    ID: string
    Type?: string
    ClaimNumber?: string
    CaregiverRelationships?: EhrNewsFeedCaregiverRelationshipModel[]
    StartDate?: string
    EndDate?: string
    Problems?: EhrNewsFeedClaimConditionModel[]
    Procedures?: EhrNewsFeedClaimProcedureModel[]
    Services?: EhrNewsFeedClaimServiceModel[]
    Medications?: EhrNewsFeedClaimMedicationModel[]
    Status?: string
    TotalCharges?: string
    TotalPaid?: string
}

export interface EhrNewsFeedClaimServiceModel {
    ID: string
    Service: string
    AmountClaimed?: string
    AmountPaid?: string
    EndDate?: string
    StartDate?: string
    Status?: string
}

export interface EhrNewsFeedClaimMedicationModel {
    ID: string
    Date?: string
    Medication?: string
    Quantity?: string
    RefillNumber?: string
    DaysSupplied?: string
    AmountPaid?: string
    AmountBilled?: string
    Status?: string
}

export interface EhrNewsFeedClaimConditionModel {
    ID: string
    Date?: string
    Problem?: string
    Type?: string
    Term?: EhrNewsFeedTermInformationModel
}

export interface EhrNewsFeedClaimProcedureModel {
    ID: string
    Date?: string
    Procedure: string
    Type?: string
}

export interface EhrNewsFeedImmunizationModel {
    ID: string
    Date?: string
    MedicationName?: string
}