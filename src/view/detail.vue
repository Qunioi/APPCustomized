<template>
  <div class="product-detail-wrap">
    <div class="product-detail-container">
      <div class="product-detail-left">
        <div class="product-info-wrap">
          <div class="product-info-header">
            <h3 class="product-info-title">{{ product?.title }}</h3>
            <p class="product-info-date">{{ product?.date }}</p>
          </div>
          <div class="product-info-theme-switch">
            <button
              :class="['product-item-theme-btn', { active: currentTheme === 'dark' }]"
              @click="switchTheme('dark')">
              深色版
            </button>
            <button
              :class="['product-item-theme-btn', { active: currentTheme === 'light' }]"
              @click="switchTheme('light')">
              浅色版
            </button>
          </div>
          <div class="product-info-image">
            <img :src="`/image/products/${product.number}/theme_${currentTheme}.jpg`" :alt="product.title">
          </div>
        </div>
        <div class="product-download-wrap">
          <button class="product-download-btn">
            <div class="icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_421_52)"><path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#D2281F"/><path d="M13.999 15C14.2308 15 14.4533 15.0843 14.6172 15.2344C14.781 15.3844 14.873 15.5877 14.873 15.7998V20.2715L16.001 19.2314C16.0821 19.1567 16.1789 19.0972 16.2852 19.0566C16.3916 19.0161 16.5058 18.9951 16.6211 18.9951C16.7364 18.9951 16.8506 19.0161 16.957 19.0566C17.0634 19.0972 17.16 19.1566 17.2412 19.2314C17.3231 19.3058 17.3883 19.3947 17.4326 19.4922C17.477 19.5896 17.5 19.6942 17.5 19.7998C17.5 19.9054 17.477 20.0099 17.4326 20.1074C17.3882 20.2049 17.3231 20.2938 17.2412 20.3682L14.6201 22.7676C14.537 22.8404 14.4383 22.8975 14.3311 22.9355C14.2265 22.9778 14.1133 23 13.999 23C13.8847 23 13.7715 22.9778 13.667 22.9355C13.5598 22.8975 13.462 22.8404 13.3789 22.7676L10.7568 20.3682C10.5923 20.2175 10.5 20.0128 10.5 19.7998C10.5 19.5868 10.5923 19.3821 10.7568 19.2314C10.9214 19.0809 11.1453 18.9971 11.3779 18.9971C11.6104 18.9972 11.8336 19.081 11.998 19.2314L13.125 20.2715V15.7998C13.1251 15.5878 13.2172 15.3843 13.3809 15.2344C13.5447 15.0844 13.7673 15.0001 13.999 15ZM13.1426 11.5713H8.42871V17.4287C8.42875 17.5422 8.47355 17.6511 8.55371 17.7314C8.63408 17.8118 8.74376 17.8574 8.85742 17.8574H9.42871C9.52246 17.8574 9.61553 17.8753 9.70215 17.9111C9.78878 17.947 9.86728 18.0001 9.93359 18.0664C9.99991 18.1327 10.053 18.2112 10.0889 18.2979C10.1247 18.3845 10.1426 18.4775 10.1426 18.5713C10.1426 18.665 10.1247 18.7581 10.0889 18.8447C10.053 18.9313 9.99986 19.0099 9.93359 19.0762C9.86731 19.1425 9.78875 19.1956 9.70215 19.2314C9.61553 19.2673 9.52246 19.2861 9.42871 19.2861H8.85742C7.83233 19.2861 7.00008 18.4549 7 17.4287V10.8574C7.00081 10.6799 7.06739 10.5085 7.18652 10.377L10.043 7.23438C10.11 7.16099 10.1923 7.10185 10.2832 7.06152C10.3739 7.02133 10.4721 7.0005 10.5713 7H13.1426V11.5713ZM17.4287 7C17.5283 7.00034 17.6267 7.02122 17.7178 7.06152C17.8089 7.10185 17.8908 7.16085 17.958 7.23438L20.8145 10.377C20.9332 10.5087 20.9995 10.6801 21 10.8574V17.4287C20.9999 18.4549 20.1688 19.2861 19.1426 19.2861H18.5713C18.4775 19.2861 18.3845 19.2673 18.2979 19.2314C18.2113 19.1956 18.1327 19.1425 18.0664 19.0762C18.0001 19.0099 17.947 18.9313 17.9111 18.8447C17.8753 18.7581 17.8574 18.665 17.8574 18.5713C17.8574 18.4775 17.8753 18.3845 17.9111 18.2979C17.947 18.2112 18.0001 18.1327 18.0664 18.0664C18.1327 18.0001 18.2112 17.947 18.2979 17.9111C18.3845 17.8753 18.4775 17.8574 18.5713 17.8574H19.1426C19.2562 17.8574 19.3659 17.8118 19.4463 17.7314C19.5265 17.6511 19.5713 17.5422 19.5713 17.4287V11.5713H14.8574V7H17.4287Z" fill="white"/></g><defs><clipPath id="clip0_421_52"><rect width="28" height="28" fill="white"/></clipPath></defs></svg>
            </div>
            <div class="text">
              <div class="cn">档案及图包下载</div>
              <div class="en">File & Image Download</div>
            </div>
          </button>
          <button class="product-download-btn">
            <div class="icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_421_53)"><path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#D2281F"/><path d="M21.1399 9.19335C21.0779 9.13087 21.0042 9.08127 20.923 9.04743C20.8417 9.01358 20.7546 8.99615 20.6666 8.99615C20.5786 8.99615 20.4914 9.01358 20.4102 9.04743C20.329 9.08127 20.2552 9.13087 20.1933 9.19335L19.3333 10.06V6.33335C19.3333 6.15654 19.263 5.98697 19.138 5.86195C19.013 5.73692 18.8434 5.66669 18.6666 5.66669C18.4898 5.66669 18.3202 5.73692 18.1952 5.86195C18.0702 5.98697 17.9999 6.15654 17.9999 6.33335V10.06L17.1399 9.19335C17.0144 9.06782 16.8441 8.99729 16.6666 8.99729C16.4891 8.99729 16.3188 9.06782 16.1933 9.19335C16.0677 9.31889 15.9972 9.48915 15.9972 9.66669C15.9972 9.84422 16.0677 10.0145 16.1933 10.14L18.1933 12.14C18.2567 12.2007 18.3314 12.2483 18.4133 12.28C18.4931 12.3153 18.5793 12.3335 18.6666 12.3335C18.7538 12.3335 18.8401 12.3153 18.9199 12.28C19.0018 12.2483 19.0765 12.2007 19.1399 12.14L21.1399 10.14C21.2024 10.078 21.252 10.0043 21.2858 9.92307C21.3197 9.84183 21.3371 9.75469 21.3371 9.66669C21.3371 9.57868 21.3197 9.49154 21.2858 9.4103C21.252 9.32906 21.2024 9.25533 21.1399 9.19335ZM18.6666 13.6667C18.4898 13.6667 18.3202 13.7369 18.1952 13.8619C18.0702 13.987 17.9999 14.1565 17.9999 14.3334V14.5867L17.0133 13.6C16.6649 13.2544 16.194 13.0604 15.7033 13.0604C15.2125 13.0604 14.7416 13.2544 14.3933 13.6L13.9266 14.0667L12.2733 12.4134C11.92 12.0771 11.451 11.8895 10.9633 11.8895C10.4755 11.8895 10.0065 12.0771 9.65325 12.4134L8.66659 13.4V9.66669C8.66659 9.48988 8.73682 9.32031 8.86185 9.19528C8.98687 9.07026 9.15644 9.00002 9.33325 9.00002H14.6666C14.8434 9.00002 15.013 8.92978 15.138 8.80476C15.263 8.67973 15.3333 8.51016 15.3333 8.33335C15.3333 8.15654 15.263 7.98697 15.138 7.86195C15.013 7.73693 14.8434 7.66669 14.6666 7.66669H9.33325C8.80282 7.66669 8.29411 7.8774 7.91904 8.25247C7.54397 8.62755 7.33325 9.13625 7.33325 9.66669V17.6667C7.33325 18.1971 7.54397 18.7058 7.91904 19.0809C8.29411 19.456 8.80282 19.6667 9.33325 19.6667H17.3333C17.8637 19.6667 18.3724 19.456 18.7475 19.0809C19.1225 18.7058 19.3333 18.1971 19.3333 17.6667V14.3334C19.3333 14.1565 19.263 13.987 19.138 13.8619C19.013 13.7369 18.8434 13.6667 18.6666 13.6667ZM9.33325 18.3334C9.15644 18.3334 8.98687 18.2631 8.86185 18.1381C8.73682 18.0131 8.66659 17.8435 8.66659 17.6667V15.2867L10.5999 13.3534C10.6979 13.26 10.828 13.208 10.9633 13.208C11.0985 13.208 11.2286 13.26 11.3266 13.3534L13.4399 15.4667L16.3066 18.3334H9.33325ZM17.9999 17.6667C17.9985 17.7942 17.9565 17.918 17.8799 18.02L14.8733 15L15.3399 14.5334C15.3877 14.4846 15.4448 14.4458 15.5077 14.4194C15.5707 14.3929 15.6383 14.3793 15.7066 14.3793C15.7749 14.3793 15.8425 14.3929 15.9054 14.4194C15.9684 14.4458 16.0255 14.4846 16.0733 14.5334L17.9999 16.4734V17.6667Z" fill="white"/></g><defs><clipPath id="clip0_421_53"><rect width="28" height="28" fill="white"/></clipPath></defs></svg></div>
            <div class="text">
              <div class="cn">图标图包下载</div>
              <div class="en">Icon Pack Download</div>
            </div>
          </button>
        </div>
      </div>
      <div class="product-detail-right">
        <div class="product-detail-content">
          <div class="product-detail-content-header">
            <div class="product-detail-content-tips">※ 提醒您，若所調整的配色與現有客製版型過於相似，BBIN 將無法進一步協助製作</div>
            <div class="product-detail-content-tabs">
              <button :class="['tab-item', { active: currentType === 'color' }]"
                @click="switchType('color')">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 2C7.51088 2 5.60322 2.79018 4.1967 4.1967C2.79018 5.60322 2 7.51088 2 9.5C2 11.4891 2.79018 13.3968 4.1967 14.8033C5.60322 16.2098 7.51088 17 9.5 17C10.1917 17 10.75 16.4417 10.75 15.75C10.75 15.425 10.625 15.1333 10.425 14.9083C10.2333 14.6917 10.1083 14.4 10.1083 14.0833C10.1083 13.3917 10.6667 12.8333 11.3583 12.8333H12.8333C15.1333 12.8333 17 10.9667 17 8.66667C17 4.98333 13.6417 2 9.5 2ZM4.91667 9.5C4.225 9.5 3.66667 8.94167 3.66667 8.25C3.66667 7.55833 4.225 7 4.91667 7C5.60833 7 6.16667 7.55833 6.16667 8.25C6.16667 8.94167 5.60833 9.5 4.91667 9.5ZM7.41667 6.16667C6.725 6.16667 6.16667 5.60833 6.16667 4.91667C6.16667 4.225 6.725 3.66667 7.41667 3.66667C8.10833 3.66667 8.66667 4.225 8.66667 4.91667C8.66667 5.60833 8.10833 6.16667 7.41667 6.16667ZM11.5833 6.16667C10.8917 6.16667 10.3333 5.60833 10.3333 4.91667C10.3333 4.225 10.8917 3.66667 11.5833 3.66667C12.275 3.66667 12.8333 4.225 12.8333 4.91667C12.8333 5.60833 12.275 6.16667 11.5833 6.16667ZM14.0833 9.5C13.3917 9.5 12.8333 8.94167 12.8333 8.25C12.8333 7.55833 13.3917 7 14.0833 7C14.775 7 15.3333 7.55833 15.3333 8.25C15.3333 8.94167 14.775 9.5 14.0833 9.5Z" fill="currentColor"/></svg>纯换色规范文件
              </button>
              <button :class="['tab-item', { active: currentType === 'custom' }]"
                @click="switchType('custom')">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.00393 0.147059L8.55464 1.22941L7.4375 1.66471C7.34643 1.7 7.28571 1.78824 7.28571 1.88235C7.28571 1.97647 7.34643 2.06471 7.4375 2.1L8.55464 2.53529L9.00393 3.61765C9.04036 3.70588 9.13143 3.76471 9.22857 3.76471C9.32571 3.76471 9.41679 3.70588 9.45321 3.61765L9.9025 2.53529L11.0196 2.1C11.1107 2.06471 11.1714 1.97647 11.1714 1.88235C11.1714 1.78824 11.1107 1.7 11.0196 1.66471L9.9025 1.22941L9.45321 0.147059C9.41679 0.0588235 9.32571 0 9.22857 0C9.13143 0 9.04036 0.0588235 9.00393 0.147059ZM13.6395 2.16765L12.9868 3.64118L11.4659 4.27353C11.2868 4.34706 11.1714 4.51765 11.1714 4.70588C11.1714 4.89412 11.2868 5.06471 11.4659 5.13824L12.9868 5.77059L13.6395 7.24412C13.7154 7.41765 13.8914 7.52941 14.0857 7.52941C14.28 7.52941 14.4561 7.41765 14.532 7.24412L15.1846 5.77059L16.7055 5.13824C16.8846 5.06471 17 4.89412 17 4.70588C17 4.51765 16.8846 4.34706 16.7055 4.27353L15.1846 3.64118L14.532 2.16765C14.4561 1.99412 14.28 1.88235 14.0857 1.88235C13.8914 1.88235 13.7154 1.99412 13.6395 2.16765ZM2.91429 9.88235C2.72 9.88235 2.54393 9.99412 2.46804 10.1676L1.81536 11.6412L0.294464 12.2735C0.115358 12.3471 0 12.5176 0 12.7059C0 12.8941 0.115358 13.0647 0.294464 13.1382L1.81536 13.7706L2.46804 15.2441C2.54393 15.4176 2.72 15.5294 2.91429 15.5294C3.10857 15.5294 3.28464 15.4176 3.36054 15.2441L4.01322 13.7706L5.53411 13.1382C5.71321 13.0647 5.82857 12.8941 5.82857 12.7059C5.82857 12.5176 5.71321 12.3471 5.53411 12.2735L4.01322 11.6412L3.36054 10.1676C3.28464 9.99412 3.10857 9.88235 2.91429 9.88235ZM3.03571 0.941176C2.70179 0.941176 2.38 1.07059 2.14018 1.3L0.856071 2.54412C0.619286 2.77647 0.485714 3.08824 0.485714 3.41176C0.485714 3.73529 0.619286 4.04706 0.856071 4.27941L3.53357 6.87353L6.60875 3.89412L3.93125 1.3C3.69143 1.07059 3.36964 0.941176 3.03571 0.941176ZM15.6582 12.6618L7.63786 4.89118L4.56268 7.87059L12.583 15.6412C12.8229 15.8706 13.1446 16 13.4786 16C13.8125 16 14.1343 15.8706 14.3741 15.6412L15.6582 14.3971C15.895 14.1647 16.0286 13.8529 16.0286 13.5294C16.0286 13.2059 15.895 12.8941 15.6582 12.6618Z" fill="currentColor"/></svg>客制化规范文件
              </button>
            </div>
          </div>
          <div class="product-detail-content-main">
            <!-- 動態載入產品內容組件 -->
            <Suspense>
              <template #default>
                <component 
                  v-if="ProductContent" 
                  :is="ProductContent" 
                  :theme="currentTheme"
                  :type="currentType"
                  :product-number="productNumber" />
              </template>
              <template #fallback>
                <div class="loading">載入中...</div>
              </template>
            </Suspense>
            <!-- <div v-if="currentType === 'color'" class="article-wrap">
              <div class="article-title">
                ▼ 起始、Loading : 仅Logo可更换
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/1-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/1-2.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ 账密登入 : 仅红框处可换色
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/2-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/2-2.jpg"></li>
                <li><img src="/image/products/M23061401/light/2-3.jpg"></li>
                <li><img src="/image/products/M23061401/light/2-4.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ 开户协议、隐私权政策 :仅红框处可换色
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/3-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/3-2.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ 注册 : 仅红框处可换色
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/4-1.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ 切换其他帐号、修改密码 : 仅红框处可换色
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/5-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/5-2.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ 系统弹窗 : 仅红框处可换色
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/6-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/6-2.jpg"></li>
                <li><img src="/image/products/M23061401/light/6-3.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ 会员中心 : 仅红框处可换色
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/7-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/7-2.jpg"></li>
                <li><img src="/image/products/M23061401/light/7-3.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ 首页大厅 : 仅红框处可更换&换色
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/8-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/8-2.jpg"></li>
                <li><img src="/image/products/M23061401/light/8-3.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ 首页大厅(左侧开) : 仅红框处可换色
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/9-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/9-2.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ 本站推荐 : 仅红框处可换色
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/10-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/10-2.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ BB电子、BB棋牌 : 仅红框处可换色
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/11-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/11-2.jpg"></li>
                <li><img src="/image/products/M23061401/light/11-3.jpg"></li>
                <li><img src="/image/products/M23061401/light/11-4.jpg"></li>
              </ul>
            </div>
            <div v-else class="article-wrap">
              <div class="article-content-tips">
                客製化範圍<span class="mask-yellow">包含純換色範圍</span>，在此基礎上進行進一步內容或版面調整。
              </div>
              <div class="article-title">
                ▼ 首页皆可客制
              </div>
              <div class="article-content">
                <ol>
                  <li>轮播图尺寸固定(640x225)</li>
                  <li>厂商游戏图不可客制</li>
                  <li>平台入口图需提供全部档案(<a href="#">请参照列表</a>)</li>
                </ol>
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/custom-1-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/custom-1-2.jpg"></li>
              </ul>
              <div class="article-title">
                ▼ 捕鱼、体育、视讯、彩票、热门内页依照首页需求是否客制内页，若客制内页，平台入口图建议跟首页一致。
              </div>
              <ul class="article-image-list">
                <li><img src="/image/products/M23061401/light/custom-2-1.jpg"></li>
                <li><img src="/image/products/M23061401/light/custom-2-2.jpg"></li>
                <li><img src="/image/products/M23061401/light/custom-2-3.jpg"></li>
                <li><img src="/image/products/M23061401/light/custom-2-4.jpg"></li>
              </ul>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import data from '@/data/data.json'

const route = useRoute()
const router = useRouter()

// 從路由參數獲取產品編號和主題
const productNumber = computed(() => route.params.number as string)
const currentTheme = ref<'dark' | 'light'>(route.params.theme as 'dark' | 'light')
const currentType = ref<'color' | 'custom'>((route.query.type as 'color' | 'custom') || 'color')
// 改用 shallowRef 而不是 ref
const ProductContent = shallowRef<Component | null>(null)

// 根據產品編號查找產品資料
const product = computed(() => {
  return data.products.find(p => p.number === productNumber.value)
})

// 動態載入產品組件
const loadProductContent = () => {
  ProductContent.value = defineAsyncComponent(() =>
    import(`@/components/products/${productNumber.value}.vue`)
      .catch(() => {
        console.error(`找不到產品組件: ${productNumber.value}.vue`)
        return import('@/components/products/Default.vue') // 備用組件
      })
  )
}

// 切換主題 (保持 type 參數)
const switchTheme = (theme: 'dark' | 'light') => {
  currentTheme.value = theme
  router.push({
    path: `/${productNumber.value}/${theme}`,
    query: { type: currentType.value }
  })
}

// 切換類型 (保持 theme 參數)
const switchType = (type: 'color' | 'custom') => {
  currentType.value = type
  router.push({
    path: `/${productNumber.value}/${currentTheme.value}`,
    query: { type }
  })
}

watch(() => productNumber.value, loadProductContent, { immediate: true })

// 監聽路由變化，同步更新狀態
watch(() => route.params.theme, (newTheme) => {
  if (newTheme) {
    currentTheme.value = newTheme as 'dark' | 'light'
  }
})

watch(() => route.query.type, (newType) => {
  if (newType) {
    currentType.value = newType as 'color' | 'custom'
  }
})


// console.log('產品編號:', productNumber.value)
// console.log('主題:', currentTheme.value)
// console.log('產品資料:', product.value)
// console.log('客製化類型:', currentType.value)
</script>