import { IPhoto } from '../models/photo.model';

export const photo1: IPhoto = {
  id: '50179462511',
  title: 'Blauflügel-Prachtlibelle (Calopteryx virgo) (1)',
  url_q: 'https://live.staticflickr.com/65535/50179462511_0752249fba_q.jpg',
  url_m: 'https://live.staticflickr.com/65535/50179462511_0752249fba_m.jpg',
  datetaken: '2020-06-21T15:16:07-08:00',
  owner: '12639178@N07',
  ownername: 'naturgucker.de',
  tags: 'ngidn2020772215 calopteryxvirgo blauflügelprachtlibelle',
};

export const photo1Link = `https://www.flickr.com/photos/${photo1.owner}/${photo1.id}`;
