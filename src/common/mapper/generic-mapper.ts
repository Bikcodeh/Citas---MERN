export interface GenericMapper<IN, OUT> {
    transform(from: IN): OUT
}