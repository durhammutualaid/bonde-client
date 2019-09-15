import styled from 'styled-components'

const Layer = styled.div`
	position: relative;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0 6px 7px rgba(0,0,0,.05);
  border-radius: 30px 30px 30px 0;
  box-sizing: border-box;
  box-shadow: 3px 8px 5px 0 rgba(0,0,0,.24);

  ${p => p.node.getOptions().selected && `
    border: 1px solid #ee0090;
  `}
`

export default Layer