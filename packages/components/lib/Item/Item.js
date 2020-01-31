export default ({content, handleInputChange}) => (
  <form>
    <input type="text" value={content} onChange={handleInputChange}/>
  </form>
);
