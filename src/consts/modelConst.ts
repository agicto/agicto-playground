type key = Record<string, number>

export const AI_TYPE: key = {
    'message': 1,
    'audio': 2,
    'image': 3
}

export const AI_IMG_DATA: any = {
    'dall-e-2': {
        'size': [{ label: '256x256', value: '256x256' }, { label: '512x512', value: '512x512' },{label: '1024x1024',  value: '1024x1024'}],
        'n': 4,
        'disabled': false
    },
    'dall-e-3': {
        'size': [{ label: '1024x1024', value: '1024x1024' }, { label: '1792x1024', value: '1792x1024' }, { label: '1024x1792', value: '1024x1792' }],
        'n': 1,
        'disabled': true
    }
}

export const AI_TYPE_TEXT: any = {
    '聊天': 'message',
    '图片': 'image'
}