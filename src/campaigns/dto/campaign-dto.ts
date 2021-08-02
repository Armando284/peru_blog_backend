export class CampaignDTO {
  readonly authorID: string;
  readonly title: string;
  readonly body: string; // se maneja como arbol en el frontend
  readonly createdAt: Date;
  updatedAt: Date;
  readonly destroyedAt: Date;
}
