import { SupportIcon } from '@core/assets';
import Container from '@core/components/base/Container/view';
import Text from '@core/components/base/Text/view';

import Spacer from '@core/components/base/Spacer/view';
import { FormContainer } from '@core/components/FormContainer/view';
import Button from '@core/components/base/Button/view';
import Switch from '@core/components/base/Switch/view';
import Input from '@core/components/layout/Input';
import useFormLogin from './from';
import useSignInViewModel from './view.model';

const SignInScreen = () => {
  const FORM = useFormLogin();
  const VIEW_MODEL = useSignInViewModel(FORM);

  return (
    <FormContainer>
      <Container style={{ paddingHorizontal: 20 }} center flex={1}>
        <Container
          width={'100%'}
          center
          gap={10}
          elevation={5}
          bg={'white'}
          borderRadius={32}
          style={{ paddingVertical: 32, paddingHorizontal: 20 }}
        >
          <SupportIcon width={300} height={130} />

          <Text color="textPrimary" size={20} font="bold">
            Suporte de Chamados
          </Text>

          <Text color="textSecondary" size={16} align="center">
            Faça login para gerenciar seus chamados
          </Text>

          <Spacer height={16} />

          <Container gap={10}>
            <Input.Root>
              <Input.Label label="E-mail" />

              <Input.Content errors={FORM?.errors.email!}>
                <Input.TextInput
                  placeholder="email@exemplo.com"
                  control={FORM.control}
                  autoCapitalize="none"
                  name="email"
                />
              </Input.Content>
            </Input.Root>

            <Input.Root>
              <Input.Label label="Senha" />
              <Input.Content errors={FORM?.errors.pwd!}>
                <Input.TextInput
                  placeholder="*********"
                  control={FORM.control}
                  name="pwd"
                  secureTextEntry={VIEW_MODEL.securityPassword}
                />
                <Input.IconPassword
                  secureTextActive={VIEW_MODEL.securityPassword}
                  onPressButton={() => VIEW_MODEL.setSecurityPassword((prev) => !prev)}
                />
              </Input.Content>
            </Input.Root>

            <Container flexDirection="row" gap={10} align="center">
              <Switch onValueChange={VIEW_MODEL.setRememberMe} value={VIEW_MODEL.rememberMe} />
              <Text color="textSecondary" size={14}>
                Lembrar-me
              </Text>
            </Container>
          </Container>

          <Spacer height={16} />

          <Button
            onPress={FORM.handleSubmit(VIEW_MODEL.onSubmit)}
            loading={VIEW_MODEL.loading}
            disabled={VIEW_MODEL.loading}
            width="100%"
            height={52}
            style={{ borderRadius: 16 }}
            accessibilityRole="button"
            accessibilityLabel="Sign In"
          >
            {/* <View style={styles.buttonContent}> */}
            <Text color="white" size={16} font="semibold">
              Entrar
            </Text>
            {/* <ArrowRightIcon size={18} /> */}
            {/* </View> */}
          </Button>
        </Container>
      </Container>
    </FormContainer>
  );
};

export default SignInScreen;
