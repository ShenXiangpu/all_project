const plaLogin = {
  实操分数榜: `实操分数榜展示的是学生在该学年下该课程中的实验平均分`,
  实操时长榜: `实操时长榜展示的是学生在该学年下该课程中使用实操设计云的累计时长，注意：若用户在该课程中的实操云登录时长<5分钟，则该次登录视为无效登录，不计入时长计算中。`,
  实操次数榜: `实操次数榜展示的是学生在该学年下该课程中使用实操设计云的累计次数，注意：若用户在该课程中的实操云登录时长<5分钟，则该次登录视为无效登录，不计入次数计算中。`,
};
const primary = (title) => {
  return `
  <div class="flex justify-center font14 marginBottom10 ">
    <div class="marginRight10 marginLeft10">
      <div>X>90%</div>
      <div>70%<=X<90%</div>
      <div>50%<=X<70%</div>
      <div>20%<=X<50%</div>
      <div>X<20%</div>
    </div>
    <div>
      <div>靠前</div>
      <div>较为靠前</div>
      <div>中等偏上</div>
      <div>中等偏下</div>
      <div>靠后</div>
    </div>
  </div>
  <div class="font12" style=" color: #999;">
    注意：上述评价标准是基于<br/>【${title}排名】数据进行划分的
  </div>
`;
};
const overall = {
  作业表现: `
  <div>
    ${primary(`作业分数`)}
  </div>
  `,
  实操表现: `<div>
    ${primary(`实操分数`)}
  </div>`,
  实操次数: `<div>
  ${primary(`实操次数`)}
</div>`,
  实操时长: `<div>
  ${primary(`实操时长`)}
</div>`,
};

export { plaLogin, overall };
