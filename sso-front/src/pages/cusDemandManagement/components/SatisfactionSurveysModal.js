import React, { PureComponent } from 'react'
import { Modal, Spin, Form, Row, Col, Input, Icon, Rate, Button, message } from 'antd'
import styles from './modal.less'
import { isEqual, isEmpty } from 'lodash';
import moment from "moment";
import ReactQuill, { Quill } from 'react-quill';//引入quilljs 富文本编辑工具
import 'react-quill/dist/quill.snow.css';
const { TextArea } = Input;
import store from 'store';
import { router } from "umi";
const token = store.get('Token');


const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
}

/**
 * 续费窗口
 */
@Form.create()

class SatisfactionSurveysModal extends PureComponent {
  state = {
    value: '**Hello world!!!**',
    reactQuillRef0: React.createRef(),
    reactQuillRef1: React.createRef(),
    editorRange: {
      current: ''
    },
    isShow: false,//控制富文本框显示图片，在第一次接口回显图片后，开启复制黏贴监听
  }

  componentDidMount() {
    const { isShow } = this.state
    this.setState({
      isShow: true
    })
  }

  componentDidUpdate(preProps) {

  }
  /**
   * 审核
   * @param {*} e 
   */
  reviewSa = (e, status) => {
    e.preventDefault();
    const { form, onReviewSa } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      const fieldValues = {
        ...values,
        id: 0,
        status,
      }
      onReviewSa(fieldValues);
    });





  }
  // 富文本配置
  getModules = (handleImage) => ({
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        // ['blockquote', 'code-block'],
        ['image'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        // [{ 'font': [] }],
        // [{ 'align': [] }],

        // ['clean'],
        // a链接和图片的显示,自定义linkIcon    
      ],

      // handlers: { image: handleImage, linkIcon: handleLinkIcon }
      handlers: { image: handleImage }

    },
    clipboard: {

      matchers: [[Node.ELEMENT_NODE, this.handleCustomMatcher]],
    },
  });

  handleCustomMatcher = (node, Delta) => {
    const { isOpenListen } = this.props
    let ops = []
    if (!isOpenListen) { // 未开启直接返回Delta
      return Delta
    } else { // 开启过滤复制图
      Delta.ops.forEach(op => {
        if (op.insert && typeof op.insert === 'string') {// 如果粘贴了图片，这里会是一个对象，所以可以这样处理
          ops.push({
            insert: op.insert,
          })
        } else {
          message.warn('不允许粘贴图片,请手动上传')
        }
      })
      Delta.ops = ops
    }

    return Delta
  }

  // /** quill- 自定义超链接按钮 */
  // linkHandler = (str) => {
  //   const { reactQuillRef0, reactQuillRef1 } = this.state
  //   if (isEqual(str, '0')) {
  //     const editor = reactQuillRef0.current.getEditor();
  //     // 获取实例    
  //     const range = editorRange.current;
  //     const length = editor.getLength();
  //     const cursorPosition = range ? range.index : length - 1;
  //     // 获取当前光标位置    
  //     const element = `${getQuillLinkElementString()}<span>&nbsp;</span>`;
  //     editor.clipboard.dangerouslyPasteHTML(cursorPosition, element);
  //   } else if (isEqual(str, '1')) {
  //     const editor = reactQuillRef1.current.getEditor();
  //     // 获取实例    
  //     const range = editorRange.current;
  //     const length = editor.getLength();
  //     const cursorPosition = range ? range.index : length - 1;
  //     // 获取当前光标位置    
  //     const element = `${getQuillLinkElementString()}<span>&nbsp;</span>`;
  //     editor.clipboard.dangerouslyPasteHTML(cursorPosition, element);
  //   }

  // };


  /** quill-自定义图片上传 */
  imageHandler0 = () => {
    const { reactQuillRef0 } = this.state
    // 创建input标签打开文件选择    
    //  自定义粘贴图片功能

    const input = document.createElement('input');
    input.setAttribute('type', 'file'); input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'multiple');
    input.click();

    input.onchange = async () => {
      Array.from(input.files).forEach((file) => {
        // 设置图片流        
        const formData = new FormData();
        formData.append('file', file, file.name);
        console.log('file', file, file.name);
        const uploadUrl = '/service/documenthandler-service/v1/dochandler/uploadImage';
        // 上传图片        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', uploadUrl, true);
        xhr.setRequestHeader("Auth-token", token);
        xhr.onreadystatechange = function readyStateChange() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const ret = JSON.parse(xhr.responseText);
            console.log(ret);
            if (ret.flag) {
              // const imageUrl = '上传成功的图片链接';
              const imageUrl = ret.resData

              const newImageUrl = imageUrl && imageUrl.split('8888')[1]
              const currentQuill = reactQuillRef0.current.getEditor();
              // 获取实例             
              const cursorPosition = currentQuill.getSelection().index;
              console.log('cursorPosition', cursorPosition);
              // 获取当前光标位置              
              currentQuill.insertEmbed(cursorPosition, 'image', newImageUrl);
              // 插入图片              
              currentQuill.setSelection(cursorPosition + 1);
              // 光标位置加1 

            }
          }
        };
        xhr.send(formData);
        // xhr.onloadend = () => { dispatch({ type: 'app/spin_hide' }); };
        xhr.onerror = () => { message.error('文件上传出错了'); };
      });
    };
  };









  imageHandler1 = () => {
    const { reactQuillRef1 } = this.state
    // 创建input标签打开文件选择    
    const input = document.createElement('input');
    input.setAttribute('type', 'file'); input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'multiple');
    input.click();

    input.onchange = async () => {
      Array.from(input.files).forEach((file) => {
        // 设置图片流        
        const formData = new FormData();
        formData.append('file', file, file.name);
        console.log('file', file, file.name);
        const uploadUrl = '/service/documenthandler-service/v1/dochandler/uploadImage';
        // 上传图片        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', uploadUrl, true);
        xhr.setRequestHeader("Auth-token", token);
        xhr.onreadystatechange = function readyStateChange() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const ret = JSON.parse(xhr.responseText);
            console.log(ret);
            if (ret.flag) {
              // const imageUrl = '上传成功的图片链接';
              const imageUrl = ret.resData

              //去掉http对环境的影响导致，https下无法显示图片
              const newImageUrl = imageUrl && imageUrl.split('8888')[1]; 
              const currentQuill = reactQuillRef1.current.getEditor();
              // 获取实例             
              const cursorPosition = currentQuill.getSelection().index;
              console.log('cursorPosition', cursorPosition);
              // 获取当前光标位置              
              currentQuill.insertEmbed(cursorPosition, 'image', newImageUrl);
              // 插入图片              
              currentQuill.setSelection(cursorPosition + 1);
              // 光标位置加1 
            }
          }
        };
        xhr.send(formData);
        // xhr.onloadend = () => { dispatch({ type: 'app/spin_hide' }); };
        xhr.onerror = () => { message.error('文件上传出错了'); };
      });
    };
  };

  exportSa = () => {
    const { onExportSa } = this.props
    onExportSa();
  }




  // formats = [
  //     'header',
  //     'bold', 'italic', 'underline', 'strike', 'blockquote',
  //     'list', 'bullet', 'indent',
  //     'link', 'image'
  // ]



  onValueChange = (value) => {
    console.log(value, 'value');
    this.setState({
      value
    })
  }

  cancel = () => {
    const { onCancel } = this.props
    onCancel()
  }


  // uploadImageCallBack = (file) => {
  //   return new Promise(
  //     (resolve, reject) => {
  //       const xhr = new XMLHttpRequest()
  //       xhr.open('POST', '/manage/img/upload')
  //       const data = new FormData()
  //       data.append('image', file)
  //       xhr.send(data)
  //       xhr.addEventListener('load', () => {
  //         const response = JSON.parse(xhr.responseText)
  //         const url = response.data.url
  //         resolve({ data: { link: url } })
  //       })
  //       xhr.addEventListener('error', () => {
  //         const error = JSON.parse(xhr.responseText)
  //         reject(error)
  //       })
  //     }
  //   )
  // }


  render() {
    const { form, ColProps, formItemLayout, btnLoading, satisfaction, ...modalProps } = this.props
    const { value, reactQuillRef0, reactQuillRef1, editorRange } = this.state
    const { getFieldDecorator } = form;



    console.log('satisfaction', satisfaction);

    return (
      <Modal
        {...modalProps}
        onOk={this.handleOk}
      // footer={this.renderFooter()}
      >
        <Form>
          <Row>
            <Col
              {...ColProps}
            >
              <Form.Item label="服务满意度" {...formItemLayout}>
                {getFieldDecorator('score', {
                  initialValue: satisfaction && satisfaction.score ? satisfaction.score : 0,
                  rules: [
                    {
                      required: true,
                      message: "请选择",
                    },
                    // {
                    //   pattern: /^\w*[a-zA-Z\u4E00-\u9FA5]+\w*$/,
                    //   // pattern: /^(?!\d*$)/,
                    //   message: '用户名可包含英文、数字、汉字或下划线，不能为纯数字',
                    // },
                  ],
                })(
                  <Rate />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              {...ColProps}
            >
              <Form.Item label="服务意见" {...formItemLayout}
              // name={"richTextContent"}
              >
                {getFieldDecorator('suggest', {
                  initialValue: satisfaction && satisfaction.suggest ? satisfaction.suggest : '',
                  rules: [
                    {
                      required: true,
                      message: "请输入服务意见",
                    },
                    // {
                    //   pattern: /^\w*[a-zA-Z\u4E00-\u9FA5]+\w*$/,
                    //   // pattern: /^(?!\d*$)/,
                    //   message: '用户名可包含英文、数字、汉字或下划线，不能为纯数字',
                    // },
                  ],
                })(
                  <ReactQuill theme="snow"
                    className={styles.email_content}
                    // modules={this.getModules(this.imageHandler('0'), this.linkHandler('0'))}
                    modules={this.getModules(this.imageHandler0)}

                    // key={form.getFieldValue('richTextContent')}
                    // // 解决回显不更新问题              
                    // value={form.getFieldValue('richTextContent')}
                    ref={reactQuillRef0}
                  // onChange={(value) => form.setFieldsValue({ richTextContent: value })}
                  // onChangeSelection={(selection, source) => {
                  //   if (['user', 'silent'].includes(source)) {
                  //     editorRange.current = selection;
                  //   }
                  // }} 
                  />
                )}
              </Form.Item>

            </Col>
          </Row>
          <Row>
            <Col
              {...ColProps}
            >
              <Form.Item label="改进意见" {...formItemLayout} style={{ height: 200 }}
              // name={"richTextContent"}
              >
                {getFieldDecorator('improveSuggest', {
                  initialValue: satisfaction && satisfaction.improveSuggest ? satisfaction.improveSuggest : '',
                  rules: [
                    {
                      required: true,
                      message: "请输入改进意见",
                    },
                    // {
                    //   validator: this.handleProjectIntro
                    // }
                  ],
                  // validateTrigger: 'onBlur'
                })(
                  // <ReactQuill
                  //   // value={value}
                  //   style={{ minHeight: '300px' }}
                  //   theme="snow"
                  //   modules={this.modules}
                  //   // formats={this.formats}
                  //   className={styles.editContainer}

                  // // onChange={this.onValueChange}
                  // />
                  <ReactQuill theme="snow"
                    className={styles.email_content}
                    modules={this.getModules(this.imageHandler1)}
                    // key={form.getFieldValue('richTextContent')}
                    // // 解决回显不更新问题              
                    // value={form.getFieldValue('richTextContent')}
                    ref={reactQuillRef1}
                    // onChange={(value) => form.setFieldsValue({ richTextContent: value })}
                    onChangeSelection={(selection, source) => {
                      if (['user', 'silent'].includes(source)) {
                        editorRange.current = selection;
                      }
                    }} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              {...ColProps}
              style={{ textAlign: 'right', padding: '30px 0 30px 0' }}
            >
              <Button disabled={satisfaction && isEqual(satisfaction.isVerified, 0) ? true : false} onClick={this.exportSa}>导出</Button>&nbsp;&nbsp;
              <Button disabled={satisfaction && isEqual(satisfaction.isVerified, 0) ? false : true} onClick={(e) => this.reviewSa(e, '2')}>审核不通过</Button>&nbsp;&nbsp;
              <Button disabled={satisfaction && isEqual(satisfaction.isVerified, 0) ? false : true} type='primary' loading={btnLoading} onClick={(e) => this.reviewSa(e, '1')}>审核通过</Button>
            </Col>
          </Row>

        </Form>
      </Modal >
    )
  }
}

export default SatisfactionSurveysModal
