import { useLocalSearchParams } from 'expo-router';
import { SubjectScreen } from '../../../src/screens/SubjectScreen';

export default function DynamicSubjectPage() {
    const { id } = useLocalSearchParams();

    // Используем наше универсальное SubjectScreen и передаем ему имя предмета из URL
    return <SubjectScreen subject={id as string} />;
}
