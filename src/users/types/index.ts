import { Exclude } from 'class-transformer';

export class SerializedUser {
  name;
  username;
  status;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
