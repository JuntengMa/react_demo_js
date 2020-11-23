import React from 'react';
import { Link } from 'react-router-dom';

export function Backend() {
  return (
    <>
      <h1>后台页面</h1>
      <Link to="/">回首页</Link>
    </>
  );
}
