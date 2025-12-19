# Photoshop-Export-Layer-Coordinates

Photoshop 的 JSX 脚本，用于导出图层 XY 坐标到 TXT 文件（适配PS2019，修复了坐标不全、中文乱码问题）


## 1. 安装步骤
1. 将 JSX 脚本文件复制到 Photoshop 安装目录下的 `Presets\Scripts` 文件夹中
   - 示例路径（PS2019）：`D:\Photoshop CC2019\Adobe Photoshop CC 2019\Presets\Scripts`
2. 重启 Photoshop，脚本会自动加载到“脚本”菜单中


## 2. 使用方法
1. 打开 Photoshop，同时打开需要导出坐标的 PSD 文件；
2. 点击顶部菜单：`文件 > 脚本 > Export Layer Coordinates`；
3. 在弹出的对话框中，选择要保存 TXT 文件的文件夹，点击“确定”即可导出。


## 3. 注意事项
- 脚本读取图层坐标的参考点：**图层自身的左上角**；
- 坐标系统规则：以画布左上角为原点 `(0,0)`，x轴向右递增，y轴向下递增（与Pygame坐标系统一致）；
- 仅导出**可见图层**的坐标（若需导出不可见图层，可删除脚本中`if (layer.visible)`的判断）。

- #代码来源于kmcguinness与豆包
