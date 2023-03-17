// 水资源承载力分层设色
export function setColorStroke(vectorIdValue, val, style) {
  const vectorId = vectorIdValue.substring(0, 9);
  if (vectorId === 'water_CZL' || vectorId === 'water_STA') {
    if (val < 0.2) {
      style.getFill().setColor('#f47f92');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else if (val >= 0.2 && val < 0.4) {
      style.getFill().setColor('#fbdb5a');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else if (val >= 0.4 && val < 0.6) {
      style.getFill().setColor('#4ecb73');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else if (val >= 0.6 && val < 0.8) {
      style.getFill().setColor('#59d4d4');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else {
      style.getFill().setColor('#3aa1ff');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    }
  }
  if (vectorId === 'water_STG') {
    if (val < 20) {
      style.getFill().setColor('#f47f92');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else if (val >= 20 && val < 40) {
      style.getFill().setColor('#fbdb5a');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else if (val >= 40 && val < 60) {
      style.getFill().setColor('#4ecb73');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else if (val >= 60 && val < 80) {
      style.getFill().setColor('#59d4d4');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else {
      style.getFill().setColor('#3aa1ff');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    }
  }
  if (vectorId === 'water_STW') {
    if (val < 40) {
      style.getFill().setColor('#f47f92');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else if (val >= 40 && val < 60) {
      style.getFill().setColor('#fbdb5a');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else if (val >= 60 && val < 70) {
      style.getFill().setColor('#4ecb73');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else if (val >= 70 && val < 80) {
      style.getFill().setColor('#59d4d4');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    } else {
      style.getFill().setColor('#3aa1ff');
      style.getStroke().setColor('#595959');
      style.getStroke().setWidth(0.6);
    }
  }
  if (vectorId === 'water_sou') {
    if (val === '1101') {
      style.getFill().setColor('#9FD7FC');
      style.getStroke().setColor('#9FD7FC');
      style.getStroke().setWidth(0.1);
    } else if (val === '1102') {
      style.getFill().setColor('#5275F8');
      style.getStroke().setColor('#5275F8');
      style.getStroke().setWidth(0.6);
    } else if (val === '1103') {
      style.getFill().setColor('#65E093');
      style.getStroke().setColor('#65E093');
      style.getStroke().setWidth(0.6);
    } else if (val === '1104') {
      style.getFill().setColor('#CD5EFB');
      style.getStroke().setColor('#CD5EFB');
      style.getStroke().setWidth(0.6);
    } else {
      style.getFill().setColor('#595959');
      // style.getStroke().setColor('#595959');
      // style.getStroke().setWidth(0.6);
    }
  }
  return style;
}

export function setColorStrokeOther() {}
