import sampleResourceImage from '../../../assets/resource-image.png';
import { ResourceDefinition } from './ResourceList';

export type ResourceListPreviewState = 'no resources' | 'some resources';

export interface ResourceListPreviewData {
    resources: ResourceDefinition[];
}

export const previewData: Record<ResourceListPreviewState, ResourceListPreviewData> = {
    'no resources': {
        resources: [] as ResourceDefinition[]
    },
    'some resources': {
        resources: [
            {"title": "Resource 1 Title", "subTitle": "resource 1 subtitle", "imageUrl": sampleResourceImage} as ResourceDefinition,
            {"title": "Resource 2 Title", "subTitle": "resource 2 subtitle", "imageUrl": sampleResourceImage} as ResourceDefinition,
            {"title": "Resource 3 Title", "subTitle": "resource 3 subtitle", "imageUrl": sampleResourceImage} as ResourceDefinition,
            {"title": "Resource 4 Title", "subTitle": "resource 4 subtitle", "imageUrl": sampleResourceImage} as ResourceDefinition,
            {"title": "Resource 5 Title", "subTitle": "resource 5 subtitle", "imageUrl": sampleResourceImage} as ResourceDefinition
        ]
    }
};