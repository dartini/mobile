import {JsonProperty} from 'ts-serializer-core';
import {TargetStatus} from './target-status.enum';
import {Dart} from './dart.model';

export class Target {

  @JsonProperty('name')
  public name: string;

  @JsonProperty('status')
  public status: TargetStatus;

  @JsonProperty('darts')
  public darts: Dart[];

  @JsonProperty('dartMax')
  public dartMax: number;

}
