import { Spectator, byTestId, createComponentFactory } from '@ngneat/spectator';
import { photo1, photo1Link } from 'src/app/spec-helpers/photo.spec-helper';

import { IPhoto } from 'src/app/models/photo.model';
import { PhotoItemComponent } from './photo-item.component';

describe('PhotoItemComponent with spectator', () => {
  let spectator: Spectator<PhotoItemComponent>;

  const createComponent = createComponentFactory({
    component: PhotoItemComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({ props: { photo: photo1 } });
  });

  it('renders a link and a thumbnail', () => {
    const link = spectator.query(byTestId('photo-item-link'));
    expect(link).toHaveAttribute('href', photo1Link);

    const img = spectator.query(byTestId('photo-item-image'));
    expect(img).toHaveAttribute('src', photo1.url_q);
    expect(img).toHaveAttribute('alt', photo1.title);
  });

  it('focusses a photo on click', () => {
    let photo: IPhoto | undefined;

    spectator.component.focusPhoto.subscribe((otherPhoto: IPhoto) => {
      photo = otherPhoto;
    });

    spectator.click(byTestId('photo-item-link'));

    expect(photo).toBe(photo1);
  });

  it('does nothing when the photo is null', () => {
    spectator.component.photo = null;
    spectator.detectChanges();

    expect(spectator.query(byTestId('photo-item-link'))).not.toExist();
  });
});
