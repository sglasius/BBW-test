// import { MessageStatsResponseModel } from '../../secure/message-stats/models/message-stats-response-model';
import { ErrorResponseModel } from './error-response-model';
import { PlaceHolderPostModel } from 'src/app/secure/show-post/models/placeholder-post-model';


/**
 * REST response related
 */
export class RestResponseModel {
    error: ErrorResponseModel
    isError: boolean;
    responseCode: number;
    placeHolderPostModel: PlaceHolderPostModel;
    // messageStatsResponseModel: MessageStatsResponseModel;
}

