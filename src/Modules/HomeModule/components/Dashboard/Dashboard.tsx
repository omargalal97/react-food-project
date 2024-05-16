
import Header from '../../../SharedModule/components/Header/Header'

import RecipesListHeader from '../../../SharedModule/components/RecipesListHeader/RecipesListHeader';
import headerimg from "../../../../assets/images/header.png";


export default function Dashboard() {
  return ( <>
    <Header title={"Welcome!"} 
    description={"This is a welcoming screen for the entry of the application , you can now see the options" } 
    imgUrl={headerimg}/>
    <RecipesListHeader title={"Check"}/>
    </>
  )
}
