import {Schema, model} from 'mongoose';
import ICharacter from '../types/ICharacter';

const characterSchema = new Schema<ICharacter>(
  {
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    description: {type: String, required: false, default: ''},
    thumbnail: {type: String, required: false, default: ''},
  },
  {
    timestamps: true,
  }
);

const CharacterModel = model<ICharacter>('Character', characterSchema);

export default CharacterModel;
