import Menu from "../../components/menu/Menu"

const ComponentTest = () => {

  const handleClick1 = () => {
    alert(1)
  }

  const handleClick2 = () => {
    alert(2)
  }

  const handleClick3 = () => {
    alert(3)
  }

  return (
    <Menu
      menuItems={[
        {
          label: 'one',
          handleClick: handleClick1
        },
        {
          label: 'two',
          handleClick: handleClick2
        },
        {
          label: 'three',
          handleClick: handleClick3
        },
      ]}
    />
  )
}

export default ComponentTest