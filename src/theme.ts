export const styles = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  heading: {
    h1: 'text-3xl font-display font-bold',
    h2: 'text-2xl font-display font-bold',
    h3: 'text-xl font-display font-bold'
  },
  button: {
    base: 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200',
    primary: 'bg-[#FF5722] text-white hover:bg-[#F4511E] focus:ring-2 focus:ring-[#FF5722]/20',
    secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200',
    danger: 'bg-white text-red-600 border border-gray-200 hover:bg-red-50 hover:text-red-700 focus:ring-2 focus:ring-red-100',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-base'
    }
  },
  card: {
    base: 'bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200',
    hover: 'hover:shadow-lg hover:border-[#FF5722]/20',
    selected: 'border-[#FF5722] shadow-md',
    interactive: 'cursor-pointer hover:shadow-lg hover:border-[#FF5722]/20'
  },
  colors: {
    primary: {
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#FF5722', // Main brand color
      600: '#F4511E',
      700: '#E64A19',
      800: '#D84315',
      900: '#BF360C'
    }
  }
};
