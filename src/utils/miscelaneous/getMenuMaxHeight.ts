const getMenuMaxHeight = () => {
    const deviceHeight = window.innerHeight;
    
    return deviceHeight < 700 ? 450 : 1000;
  };


  export default getMenuMaxHeight