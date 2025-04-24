/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-debugging-utils */
// import { fireEvent, render, screen } from '@testing-library/react';
// import Post from '.';
// import PostComment from '.';

// describe('Teste para o componente PostComment', () => {
//     it('Deve renderizar o componente corretamente', () => {
//         render(<PostComment/>);
//         expect(screen.getByText('Comentar')).toBeInTheDocument();
//     });
// });

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Post from '.';

describe('Teste para o componente PostComments', () => {
    it('Deve adicionar 2 comentários à lista', async () => {
        // 1. Renderiza o componente com debug
        const { debug } = render(<Post />);
        console.log('=== Estado Inicial ===');
        debug(); // Mostra o HTML inicial

        // 2. Seleciona elementos
        const commentForm = screen.getByTestId('comment-form');
        const commentInput = screen.getByTestId('comment-input');
        
        // 3. Primeiro comentário
        fireEvent.change(commentInput, { target: { value: 'Primeiro comentário' } });
        console.log('\n=== Após alterar primeiro comentário (antes do submit) ===');
        debug();
        
        fireEvent.submit(commentForm);
        console.log('\n=== Após submit do primeiro comentário ===');
        debug();

        // 4. Segundo comentário
        fireEvent.change(commentInput, { target: { value: 'Segundo comentário' } });
        console.log('\n=== Após alterar segundo comentário (antes do submit) ===');
        debug();
        
        fireEvent.submit(commentForm);
        console.log('\n=== Após submit do segundo comentário ===');
        debug();

        // 5. Verificação final com waitFor
        await waitFor(() => {
            console.log('\n=== Verificando resultados finais ===');
            const comments = screen.getAllByTestId('comment');
            debug(); // Mostra estado final
            
            console.log('Comentários encontrados:', comments.length);
            expect(comments).toHaveLength(2);
            expect(comments[0]).toHaveTextContent('Primeiro comentário');
            expect(comments[1]).toHaveTextContent('Segundo comentário');
        });

        console.log('\n=== Teste concluído ===');
    });
});