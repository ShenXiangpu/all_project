import { opDict } from "@/api/crm/dic";

const queryOpDict = async (dictName, objName) => {
  try {
    const res = await opDict({ dictName, delFlag: 0 }, "query");
    if (res && res.flag) {
      return res.resData[objName];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const companyType = async (
  dictName = "单位类型",
  objName = "companyType"
) => {
  return await queryOpDict(dictName, objName);
};

export const contractStatus = async (
  dictName = "合同状态",
  objName = "contractStatus"
) => {
  return await queryOpDict(dictName, objName);
};

export const cooperationArea = async (
  dictName = "合作方向",
  objName = "cooperationArea"
) => {
  return await queryOpDict(dictName, objName);
};

export const customerIntent = async (
  dictName = "客户意向",
  objName = "customerIntent"
) => {
  return await queryOpDict(dictName, objName);
};
export const customerLevel = async (
  dictName = "客户级别",
  objName = "customerLevel"
) => {
  return await queryOpDict(dictName, objName);
};

export const customerSource = async (
  dictName = "客户来源",
  objName = "customerSource"
) => {
  return await queryOpDict(dictName, objName);
};
export const followUpStatus = async (
  dictName = "跟进状态",
  objName = "followUpStatus"
) => {
  return await queryOpDict(dictName, objName);
};
export const followUpType = async (
  dictName = "跟进方式",
  objName = "followUpType"
) => {
  return await queryOpDict(dictName, objName);
};
export const paymentStatus = async (
  dictName = "付款状态",
  objName = "paymentStatus"
) => {
  return await queryOpDict(dictName, objName);
};

export const customerType = async (
  dictName = "合同类型",
  objName = "contractType"
) => {
  return await queryOpDict(dictName, objName);
};


export const signatoryType  = async (
  dictName = "签约类型",
  objName = "signatoryType"
) => {
  return await queryOpDict(dictName, objName);
};


export const contractFollowUpStatus  = async (
  dictName = "合同跟进状态",
  objName = "contractFollowUpStatus"
) => {
  return await queryOpDict(dictName, objName);
};


export const supplierType  = async (
  dictName = "供应商类别",
  objName = "supplierType"
) => {
  return await queryOpDict(dictName, objName);
};



export const cooperationType  = async (
  dictName = "合作类型",
  objName = "cooperationType"
) => {
  return await queryOpDict(dictName, objName);
};

