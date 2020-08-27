import React, { useState } from 'react';

import { TimePicker, ConfigProvider, Button } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';
import enGB from 'antd/es/locale/en_GB';

import moment from 'moment';

export default function App() {
  const [lang, setLang] = useState(zhCN);
  return (
    <ConfigProvider locale={lang}>
      <Button onClick={() => setLang(zhCN)}>CN</Button>
      <Button onClick={() => setLang(enGB)}>EN</Button>
      <div className="App">
        <TimePicker
          defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
        />
      </div>
    </ConfigProvider>
  );
}

