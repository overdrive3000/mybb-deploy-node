import config from '../config/aws_config';
import settings from '../config/settings';
import createStack from './create_stack';
import checkStatus from './check_status';

export default async () => {
  let stack = await createStack(settings.templateURL);

  let status = await checkStatus(stack.StackId);
  console.log(status);

}
