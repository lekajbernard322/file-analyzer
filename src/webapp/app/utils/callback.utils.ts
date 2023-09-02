export const createOnPressEnter = (callback) => ({key}) => key === 'Enter' && callback && callback()
