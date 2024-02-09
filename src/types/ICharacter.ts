interface ICharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default ICharacter;
