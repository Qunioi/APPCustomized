export const useResources = () => {
  const env = import.meta.env
  const fileName = env.VITE_FILE_NAME || 'appCustomized'
  const basePath = env.MODE === 'production' ? `/${fileName}/` : '/'

  // 開啟遊戲列表
  const openGameList = () => {
    try {
      let gameUrl = '#/game'
      if (env.MODE === 'production') {
        gameUrl = `/${fileName}/#/game`
      }
      const newWindow = window.open(gameUrl, '_blank')
      if (!newWindow) {
        console.error('❌ 瀏覽器阻擋彈出視窗')
        alert('請允許彈出視窗,或檢查瀏覽器設定')
      }
    } catch (error) {
      console.error('❌ 開啟視窗錯誤:', error)
    }
  }

  // 開啟 Icon 頁面
  const openIconList = () => {
    try {
      let iconUrl = '#/icon'
      if (env.MODE === 'production') {
        iconUrl = `/${fileName}/#/icon`
      }
      const newWindow = window.open(iconUrl, '_blank')
      if (!newWindow) {
        console.error('❌ 瀏覽器阻擋彈出視窗')
        alert('請允許彈出視窗,或檢查瀏覽器設定')
      }
    } catch (error) {
      console.error('❌ 開啟視窗錯誤:', error)
    }
  }

  // 統一的資源處理
  const handleResource = (type: 'game' | 'icon') => {
    switch (type) {
      case 'game':
        openGameList()
        break
      case 'icon':
        openIconList()
        break
    }
  }

  return {
    openGameList,
    openIconList,
    handleResource
  }
}