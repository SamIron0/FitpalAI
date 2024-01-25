export default function AuthUI() {
  const { supabase } = useSupabase();
  const [captchaToken, setCaptchaToken] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [botField, setBotField] = useState('');

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    let emailField = data.email;
    if(botField !==''){
      emailField = 'bot';
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailField,
        password: password,
        options: { captchaToken }
      });
      if(error){
        toast.error(error.message);
      }else{
        toast.success(
          'Account created. Please check your email for verification.'
        );
        router.refresh();
      }
    }catch(error){
        toast.error('An error occurred during login.');
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-black">
      //... (omitted other fields in form)
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ email, password });
        }}
      >
        <input 
          type='hidden' 
          style={{ display: 'none' }} 
          value={botField}
          onChange={e => setBotField(e.target.value)}
        />
        //... (omitted other fields in form)
      </form>
      //... (omitted rest of the code)
    </section>
  );
}