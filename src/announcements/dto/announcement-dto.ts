export class AnnouncementDTO {
  readonly authorID: string;
  readonly title: string;
  readonly body: string;
  readonly createdAt: Date;
  updatedAt: Date;
  readonly destroyedAt: Date;
}
