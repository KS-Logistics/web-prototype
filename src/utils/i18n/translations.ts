export type Language = 'en' | 'zh';

export const translations = {
  en: {
    // Common
    confirm: 'Confirm',
    cancel: 'Cancel',
    edit: 'Edit',
    search: 'Search',
    loading: 'Loading',
    
    // Container Status
    inProgress: 'In Progress',
    completed: 'Completed',
    
    // Container Details
    containerNumber: 'Container Number',
    basicInfo: 'Basic Information',
    shippingInfo: 'Shipping Information',
    containerType: 'Container Type',
    weight: 'Weight',
    destination: 'Destination',
    loadingPort: 'Loading Port',
    dischargePort: 'Discharge Port',
    vessel: 'Vessel',
    voyage: 'Voyage',
    eta: 'ETA',
    viewQRCode: 'View QR Code',
    
    // Container Form
    addContainer: 'Add Container',
    editContainer: 'Edit Container',
    enterContainerNumber: 'Enter container number',
    selectContainerType: 'Select container type',
    enterWeight: 'Enter weight',
    enterDestination: 'Enter destination',
    enterLoadingPort: 'Enter loading port',
    enterDischargePort: 'Enter discharge port',
    enterVessel: 'Enter vessel name',
    enterVoyage: 'Enter voyage number',
    enterETA: 'Enter ETA',
    ton: 'ton',
    
    // Validation Messages
    pleaseEnterContainerNumber: 'Please enter container number',
    pleaseSelectContainerType: 'Please select container type',
    pleaseEnterWeight: 'Please enter weight',
    pleaseEnterDestination: 'Please enter destination',
    pleaseEnterLoadingPort: 'Please enter loading port',
    pleaseEnterDischargePort: 'Please enter discharge port',
    pleaseEnterVessel: 'Please enter vessel name',
    pleaseEnterVoyage: 'Please enter voyage number',
    pleaseEnterETA: 'Please enter ETA',
    
    // Search
    searchContainer: 'Search container',
  },
  zh: {
    // Common
    confirm: '确认',
    cancel: '取消',
    edit: '编辑',
    search: '搜索',
    loading: '加载中',
    
    // Container Status
    inProgress: '进行中',
    completed: '已完成',
    
    // Container Details
    containerNumber: '集装箱号',
    basicInfo: '基本信息',
    shippingInfo: '航运信息',
    containerType: '箱型',
    weight: '货重',
    destination: '目的地',
    loadingPort: '装货港',
    dischargePort: '卸货港',
    vessel: '船名',
    voyage: '航次',
    eta: '预计到达时间',
    viewQRCode: '查看二维码',
    
    // Container Form
    addContainer: '添加集装箱',
    editContainer: '编辑集装箱',
    enterContainerNumber: '请输入集装箱号',
    selectContainerType: '请选择箱型',
    enterWeight: '请输入货重',
    enterDestination: '请输入目的地',
    enterLoadingPort: '请输入装货港',
    enterDischargePort: '请输入卸货港',
    enterVessel: '请输入船名',
    enterVoyage: '请输入航次',
    enterETA: '请输入预计到达时间',
    ton: '吨',
    
    // Validation Messages
    pleaseEnterContainerNumber: '请输入集装箱号',
    pleaseSelectContainerType: '请选择箱型',
    pleaseEnterWeight: '请输入货重',
    pleaseEnterDestination: '请输入目的地',
    pleaseEnterLoadingPort: '请输入装货港',
    pleaseEnterDischargePort: '请输入卸货港',
    pleaseEnterVessel: '请输入船名',
    pleaseEnterVoyage: '请输入航次',
    pleaseEnterETA: '请输入预计到达时间',
    
    // Search
    searchContainer: '搜索集装箱',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export const getTranslation = (lang: Language, key: TranslationKey): string => {
  return translations[lang][key];
}; 