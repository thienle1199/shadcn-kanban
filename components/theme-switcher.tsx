"use client";
import { useTheme } from "next-themes"

const ThemeSwitcher = () => {
    const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      
      // Toggle dark class on root element
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newTheme;
    });
  };

  return (
    <div className="flex items-center justify-center gap-6 px-6 py-3 bg-background rounded">
      {/* Light mode icon */}
      <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 0 1.177l-.833.833a.833.833 0 0 1-1.177-1.177l.833-.833a.833.833 0 0 1 1.177 0Zm11.667 0 .833.833a.833.833 0 0 1-1.177 1.177l-.833-.833a.833.833 0 0 1 1.177-1.177ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.177-6.666.833.833a.833.833 0 1 1-1.177 1.177l-.833-.833a.833.833 0 1 1 1.177-1.177ZM3.75 2.917a.833.833 0 0 1 0 1.177l-.833.833a.833.833 0 1 1-1.177-1.177l.833-.833a.833.833 0 0 1 1.177 0Zm5.417-1.917a.833.833 0 0 1 .833.833v.834a.833.833 0 1 1-1.667 0V1.833A.833.833 0 0 1 9.167 1Z"
          fill="#828FA3"
          className="transition-colors"
        />
      </svg>

      {/* Toggle switch */}
      <button
        onClick={toggleTheme}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          theme === 'dark' ? 'bg-purple-600' : 'bg-purple-600'
        }`}
      >
        <div
          className={`absolute w-3.5 h-3.5 bg-white rounded-full top-[3px] transition-transform ${
            theme === 'dark' ? 'translate-x-[23px]' : 'translate-x-[3px]'
          }`}
        />
      </button>

      {/* Dark mode icon */}
      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
          fill="#828FA3"
          className="transition-colors"
        />
      </svg>
    </div>
  );
};

export default ThemeSwitcher;