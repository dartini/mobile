import {JsonProperty} from 'ts-serializer-core';

export class User {

  @JsonProperty({name: 'uid', excludeToJson: true})
  public id: string;

  @JsonProperty('displayName')
  public displayName: string;

  @JsonProperty('email')
  public email: string;

  @JsonProperty('photoURL')
  public photoURL: string;

  @JsonProperty('targets')
  public targetsNames: string[];
}
