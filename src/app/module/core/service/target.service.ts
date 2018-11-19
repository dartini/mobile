import {NgxTsDeserializerService} from 'ngx-ts-serializer';
import {mergeMap, toArray, map} from 'rxjs/operators';
import {Target} from '../model/target.model';
import {User} from '../model/user.model';
import {Observable, from, forkJoin} from 'rxjs';
import {AngularFirestore, QuerySnapshot, QueryDocumentSnapshot} from 'angularfire2/firestore';
import {Injectable} from '@angular/core';

@Injectable()
export class TargetService {

  public constructor(private db: AngularFirestore,
                    private deserializer: NgxTsDeserializerService) {
  }

  public findUserTargets(user: User): Observable<Target[]> {
    return from(user.targetsNames).pipe(
      map((name: string) => this.db.collection('targets', (ref) => ref.where('name', '==', name)).get()),
      toArray(),
      mergeMap((qss$: Observable<QuerySnapshot<any>>[]) => forkJoin(qss$)),
      mergeMap((qss: QuerySnapshot<any>[]) => qss),
      mergeMap((qs: QuerySnapshot<any>) => qs.docs),
      map((qds: QueryDocumentSnapshot<any>) => this.deserializer.deserialize(Target, qds.data())),
      toArray()
    );
  }

}
