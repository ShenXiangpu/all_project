import router from 'umi/router';
import { Button } from 'antd';

//<React.Fragment> 短语法，支持返回多个元素
export default () =>
  <>
    <h1>Dashboard Analysis Page</h1>
    <Button type="primary" onClick={() => {
      router.goBack();
    }}>Back</Button>
  </>

