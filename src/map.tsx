import { useActiveCell, useCloudStorage, useRecord } from '@vikadata/widget-sdk';
import React from 'react';

function getURL(data, devKey){
  return  `https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${data.lat},${data.lng};title:${data.title};addr:&key=${devKey}&referer=vika-widget`
}

function getIframe(mapUrl){
  return (
    <iframe src={mapUrl} frameBorder="0" width="100%" height="100%"></iframe>
  )
}

export const Map: React.FC = () => {
  // 新建图表需要的上下文
  const activeCell = useActiveCell();
  const activeRecord = useRecord(activeCell?.recordId);
  var localData = localStorage.getItem("widgetRecordReader")

  // 纬度
  const [latitudeFieldId] = useCloudStorage<string>('latitude')

  // 经度
  const [longitudeFieldId] = useCloudStorage<string>('longitude')

  const [markerTitleFieldId] = useCloudStorage<string>('markerTitle')

  // 腾讯地图开发密钥
  const [devKey] = useCloudStorage<string>('devKey', "")

  console.log("activeCell", activeCell)
  console.log("activeRecord", activeRecord)
  
  
  if(activeCell){
    const lat = activeRecord?.getCellValueString(latitudeFieldId)
    const lng = activeRecord?.getCellValueString(longitudeFieldId)
    const title = activeRecord?.getCellValueString(markerTitleFieldId)
    const mapData = {lat, lng, title}

    localStorage.setItem("widgetRecordReader", JSON.stringify({lat, lng, title}))
  
    const mapUrl = getURL(mapData, devKey)
    console.log({mapData, mapUrl})
    
    return getIframe(mapUrl);
  }else if(localData){
    const mapUrl = getURL( JSON.parse(localData), devKey )
    return getIframe(mapUrl);
  }

  return (<div>请单击任意单元格</div>)
};
