export class CampaignDTO {
  readonly authorID: string;
  readonly title: string;
  readonly body: []; // esto se debe cambiar por un arbol, para simular mejor el DOM
  readonly createdAt: Date;
  updatedAt: Date;
  readonly destroyedAt: Date;
}
