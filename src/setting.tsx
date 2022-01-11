import React from 'react';
import { useSettingsButton, useCloudStorage, FieldPicker, useActiveViewId, useFields, useViewIds } from '@vikadata/widget-sdk';
import { TextInput } from '@vikadata/components';


export const Setting: React.FC = () => {
  const [isShowingSettings] = useSettingsButton()

  const viewIds = useViewIds()
  const activeViewId = useActiveViewId()
  const fields = useFields(activeViewId?activeViewId:viewIds[0])

  // 纬度
  const [latitudeFieldId, setLatitude] = useCloudStorage<string>('latitude', "")

  // 经度
  const [longitudeFieldId, setLongitude] = useCloudStorage<string>('longitude', "")

  const [markerTitleFieldId, setMarkerTitle] = useCloudStorage<string>('markerTitle', "定位位置")

  // 腾讯地图开发密钥
  const [devKey, setDevKey] = useCloudStorage<string>('devKey', "")


  return isShowingSettings ? (
    <div style={{ flexShrink: 0, width: '300px', borderLeft: 'solid 1px gainsboro', paddingLeft: '16px', paddingTop: '40px', paddingRight: '16px', backgroundColor: '#fff' }}>
      <h3>配置</h3>

      <div style={{ marginTop: '16px' }}>
        <label style={{ fontSize: '12px', color: '#999' }}>请填写腾讯地图的开发密钥</label>
        <TextInput placeholder="请输入内容" type="password" value={devKey} onInput={ e => {
          setDevKey(e.currentTarget.value)
        }} />
      </div>

      <div style={{ marginTop: '16px' }}>
        <label style={{ fontSize: '12px', color: '#999' }}>请选择作为纬度的字段</label>
        <FieldPicker viewId={activeViewId?activeViewId:viewIds[0]} fieldId={latitudeFieldId || fields[0].id} onChange={option => setLatitude(option.value)} />
      </div>

      <div style={{ marginTop: '16px' }}>
        <label style={{ fontSize: '12px', color: '#999' }}>请选择作为经度的字段</label>
        <FieldPicker viewId={activeViewId?activeViewId:viewIds[0]} fieldId={longitudeFieldId || fields[0].id} onChange={option => setLongitude(option.value)} />
      </div>

      <div style={{ marginTop: '16px' }}>
        <label style={{ fontSize: '12px', color: '#999' }}>请选择一个字段作为地点名称</label>
        <FieldPicker viewId={activeViewId?activeViewId:viewIds[0]} fieldId={markerTitleFieldId || fields[0].id} onChange={option => setMarkerTitle(option.value)} />
      </div>

    </div>
  ) : null;
};
