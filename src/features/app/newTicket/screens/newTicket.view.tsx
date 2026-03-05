import * as Native from 'react-native';
import { ArrowRight, Calendar, CalendarDays } from 'lucide-react-native';
import { theme } from '@core/theme/theme';
import Container from '@core/components/base/Container/view';
import Text from '@core/components/base/Text/view';
import Button from '@core/components/base/Button/view';
import useFormNewTicket from './form';
import PrioritySelector from '../components/PrioritySelector';
import useNewTicketViewModel from './view.model';
import Header from '@core/components/layout/Header';
import Input from '@core/components/layout/Input';
import { FormContainer } from '@core/components/FormContainer/view';
import Spacer from '@core/components/base/Spacer/view';
import { dateMask } from '@core/utils/masks';

const NewTicketScreen = () => {
  const FORM = useFormNewTicket();
  const VIEW_MODEL = useNewTicketViewModel(FORM);

  return (
    <Container flex={1} align="center" bg="background">
      <Header.Root>
        <Header.Title title="Novo Ticket" />
      </Header.Root>

      <Container flex={1} width="100%" style={{ paddingHorizontal: 16 }}>
        <FormContainer>
          <Spacer height={30} />

          <Container gap={6} style={{ paddingHorizontal: 4 }}>
            <Text size={11} font="medium" color="textMuted" style={{ textTransform: 'uppercase' }}>
              Data de Abertura
            </Text>

            <Container flexDirection="row" align="center" gap={8} style={{ paddingHorizontal: 4 }}>
              <Calendar size={18} color={theme.colors.primary300} />
              <Text size={14} font="light" color="textSecondary">
                {VIEW_MODEL.openingDate}
              </Text>
            </Container>
          </Container>

          <Spacer height={30} />

          <Container gap={8} flex={1}>
            <Input.Root>
              <Input.Label label="Titulo do Ticket" />
              <Input.Content errors={FORM.errors.title!}>
                <Input.TextInput
                  control={FORM.control}
                  name="title"
                  placeholder="Breve resumo do problema"
                />
              </Input.Content>
            </Input.Root>

            <Input.Root>
              <Input.Label label="Descrição" />
              <Input.Content errors={FORM.errors.description!} style={{ height: 100 }}>
                <Input.TextInput
                  control={FORM.control}
                  name="description"
                  placeholder="Descreva o problema com detalhes para que possamos ajudar da melhor forma possível"
                  multiline
                  numberOfLines={5}
                  maxLength={128}
                  style={{ height: 100, textAlignVertical: 'top', top: 6 }}
                />
              </Input.Content>

              <Input.TextCounter
                counter={FORM.control._formValues.description?.length || 0}
                charactersTotal={128}
              />
            </Input.Root>

            <Input.Root>
              <Input.Label label="Prazo de encerramento." />
              <Input.Content errors={FORM.errors.deadline!}>
                <Input.TextInputMask
                  control={FORM.control}
                  name="deadline"
                  placeholder="dd/mm/aaaa"
                  mask={dateMask}
                  keyboardType="numeric"
                  maxLength={10}
                />
                <Container style={styles.deadlineIcon} pointerEvents="none">
                  <CalendarDays size={20} color={theme.colors.textLight} strokeWidth={1.5} />
                </Container>
              </Input.Content>
            </Input.Root>
            <Spacer />

            <PrioritySelector
              selected={FORM.watch('priority')}
              onChange={(value) => FORM.setValue('priority', value)}
            />
          </Container>
        </FormContainer>

        <Button
          bg="primary"
          width="100%"
          loading={VIEW_MODEL.loading}
          disabled={VIEW_MODEL.loading}
          height={52}
          style={{ borderRadius: 24 }}
          onPress={FORM.handleSubmit(VIEW_MODEL.onSubmit)}
          accessibilityRole="button"
          accessibilityLabel="Criar Ticket"
        >
          <Container flexDirection="row" align="center" justify="center" gap={8}>
            <Text size={16} font="bold" color="white">
              Criar Ticket
            </Text>
            <ArrowRight size={25} color={theme.colors.white} fontWeight={'700'} />
          </Container>
        </Button>
        <Spacer height={16} />
      </Container>
    </Container>
  );
};

const styles = Native.StyleSheet.create({
  deadlineIcon: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default NewTicketScreen;
