import { useNavigation } from '@react-navigation/native';
const Home=()=>{
  const navigation = useNavigation();

   const handleNavigate=()=>{
        navigation.navigate('CartList')
   }


}

export default Home;
