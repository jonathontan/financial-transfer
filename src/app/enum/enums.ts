export enum FetchStatus {
  IDLE,
  LOADING,
  COMPLETED,
  FAILED,
}

export enum BiteAccountStatus {
  CREATED = "CREATED",
  UPLOADED = "UPLOADED",
  SCHEDULED= "SCHEDULED",
  EXECUTING = "EXECUTING",
  COMPLETED = "COMPLETED",
  NEW_UPLOAD = "NEW_UPLOAD",
}

export enum UploadType {
  FILE = "file",
  LINK = "link",
}
