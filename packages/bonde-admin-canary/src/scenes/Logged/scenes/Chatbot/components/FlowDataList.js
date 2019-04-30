import React from 'react'
import {
  Button,
  DataListCard,
  Flexbox2 as Flexbox,
  SwitchSlider,
  Text,
  Title
} from 'bonde-styleguide'


const DraftButtonRender = (draft) => (
  <SwitchSlider round checked={!draft}>
    <Text>{draft ? 'RASCUNHO' : 'ATIVO'}</Text>
  </SwitchSlider>
)

const NameRender = (name) => (
  <Title.H4>{name}</Title.H4>
)

const ActionRender = ({ data, changeCampaign }) => {
  return (
    <Flexbox horizontal>
      <Button onClick={() => changeCampaign(data)}>Editar</Button>
      <Button flat>Excluir</Button>
    </Flexbox>
  )
}

export default ({ edges, changeCampaign }) => {
  return (
    <DataListCard
      picker='node'
      fields={{
        name: { render: NameRender },
        draft: { render: DraftButtonRender },
        id: {
          width: 120,
          render: (id, data) => (
            <ActionRender data={data} changeCampaign={changeCampaign} />
          )
        }
      }}
      items={edges}
    />
  )
}