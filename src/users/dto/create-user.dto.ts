export class CreateUserDto {
  readonly rolId: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  updatedAt: Date;
}
