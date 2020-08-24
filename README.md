# About
This plugin is created to manage multiple color themes in one Figma design file. Enables save and switch between different color themes. Good for developing design systems, projects require multiple color themes (like dark mode and light mode), and realizing all of your color ambitious.

# Features
## Save Color Theme
Carefully name your current color theme and it will be saved within the Figma file you are working with. This will save all local color styles into a color theme. Note color styles in color themes will not update when you modified local color styles, you need to manually save changes to color themes.
## Apply Color Theme
Change to an entirely different look by applying a color theme with only one click. Your local color styles will be replaced by ones from the color theme you choose.
## Import/Export Color Themes
Due to the current Figma Plugin API limitation, transferring data across Figma file can not be streamlined. A second-best solution is offered by Color Theme Manager, simply copy your saved color theme into clipboard and paste to another file.
# How?
Color Theme Manager will look for color style from a saved theme with the exact same name and replace the local style. So name your color styles (and color themes) wisely. Repeated names will cause unexpected results.
# Future
- Features like auto update, read/write to libraries can not be implemented efficiently with the current set of APIs. This might change when new APIs come out.
- Color styles involve image fill is not implemented very efficiently. This might be fixed in a future update.
- UI might be reimplemented in a more maintainable way.