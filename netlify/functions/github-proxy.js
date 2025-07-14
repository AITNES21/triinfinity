// netlify/functions/github-proxy.js
exports.handler = async (event, context) => {
    // Solo POST permitido
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Verificar autenticación (opcional: añadir más seguridad)
    const { action, noticias } = JSON.parse(event.body);

    // Token desde variable de entorno de Netlify
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_OWNER = process.env.GITHUB_OWNER || 'AITNES21';
    const GITHUB_REPO = process.env.GITHUB_REPO || 'triinfinity';
    const FILE_PATH = 'noticias.json';

    if (!GITHUB_TOKEN) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Token no configurado' })
        };
    }

    try {
        if (action === 'getSHA') {
            // Obtener SHA actual
            const response = await fetch(
                `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
                {
                    headers: {
                        'Authorization': `token ${GITHUB_TOKEN}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                return {
                    statusCode: 200,
                    body: JSON.stringify({ sha: data.sha })
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ sha: null })
            };
        }

        if (action === 'saveNoticias') {
            // Primero obtener SHA
            const shaResponse = await fetch(
                `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
                {
                    headers: {
                        'Authorization': `token ${GITHUB_TOKEN}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            let sha = null;
            if (shaResponse.ok) {
                const shaData = await shaResponse.json();
                sha = shaData.sha;
            }

            // Guardar noticias
            const content = Buffer.from(JSON.stringify(noticias, null, 2)).toString('base64');

            const body = {
                message: `Actualizar noticias - ${new Date().toLocaleString('es-ES')}`,
                content: content
            };

            if (sha) {
                body.sha = sha;
            }

            const response = await fetch(
                `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${GITHUB_TOKEN}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            );

            if (response.ok) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ success: true })
                };
            } else {
                const error = await response.text();
                return {
                    statusCode: response.status,
                    body: JSON.stringify({ error: error })
                };
            }
        }

        if (action === 'loadNoticias') {
            const response = await fetch(
                `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
                {
                    headers: {
                        'Authorization': `token ${GITHUB_TOKEN}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                const content = JSON.parse(Buffer.from(data.content, 'base64').toString());
                return {
                    statusCode: 200,
                    body: JSON.stringify({ noticias: content })
                };
            }

            return {
                statusCode: 404,
                body: JSON.stringify({ noticias: [] })
            };
        }

        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Acción no válida' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};