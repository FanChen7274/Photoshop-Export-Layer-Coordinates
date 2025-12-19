#target photoshop
app.bringToFront();

var docRef = app.activeDocument;
var docName = docRef.name.replace(/\.[^\.]+$/, ""); // 移除文件名后缀，避免重复
var actualLayerCount = 0; // 实际统计的图层数量（修复计数问题）

// 改为使用像素单位（更符合常见需求，避免百分比转换误差）
var defaultRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;

var coords = "";

// 递归处理所有图层（包括嵌套图层组）
function recurseLayers(currLayerSet) {
  for (var i = 0; i < currLayerSet.layers.length; i++) {
    var layer = currLayerSet.layers[i];
    // 只处理可见图层（可选，根据需要调整）
    if (layer.visible) {
      try {
        // bounds格式：[左, 上, 右, 下]，取左上角坐标
        var x = Math.round(layer.bounds[0].value);
        var y = Math.round(layer.bounds[1].value);
        coords += layer.name + ":\nX: " + x + "\nY: " + y + "\n\n";
        actualLayerCount++; // 统计实际处理的图层
      } catch (e) {
        // 跳过无法获取坐标的特殊图层（如调整图层等）
        coords += layer.name + ": 无法获取坐标\n\n";
      }
    }
    
    // 如果是图层组，递归处理子图层
    if (isLayerSet(layer)) {
      recurseLayers(layer);
    }
  }
}

function isLayerSet(layer) {
  try {
    return layer.layers !== undefined && layer.layers.length > 0;
  } catch (err) {
    return false;
  }
}

var FPath = Folder.selectDialog("选择保存坐标的文件夹");

if (FPath) {
  // 检测系统并设置换行符
  var fileLineFeed = $.os.search(/windows/i) !== -1 ? "Windows" : "Macintosh";
  
  function writeFile(info) {
    try {
      var f = new File(FPath + "/" + docName + "_coordinates.txt");
      // 确保文件不存在时不报错
      if (f.exists) f.remove();
      f.open('a', "UTF-8"); // 强制UTF-8编码，解决乱码问题
      f.lineFeed = fileLineFeed;
      f.write(info);
      f.close();
    } catch (e) {
      alert("保存文件失败: " + e.message);
    }
  }

  recurseLayers(docRef);
  preferences.rulerUnits = defaultRulerUnits; // 恢复原始单位设置
  writeFile(coords);
  
  alert("成功导出 " + actualLayerCount + " 个图层的坐标到:\n" + FPath + "/" + docName + "_coordinates.txt", "导出成功");
} else {
  alert("导出已取消", "取消操作");
}