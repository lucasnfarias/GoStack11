import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsrepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
